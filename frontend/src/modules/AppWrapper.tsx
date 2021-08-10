import React, { Suspense } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import ROUTES from "Src/constants/routes";
import { IS_LOGGED_IN } from "Src/constants/auth";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';
import { CustomSpinner } from "./../components/Spiner";
import BaseLayout from "./BaseLayout";
import {
	ServiceMetrics,
	ServiceMap,
	TraceDetail,
	TraceGraph,
	UsageExplorer,
	ServicesTable,
	Signup,
	SettingsPage,
	InstrumentationPage,
} from "Src/pages";
import { RouteProvider } from "./RouteProvider";
import { ErrorFallback } from "../components/ErrorFallback"
import NotFound from "Src/components/NotFound";

const App = () => {
	const { status } = useThemeSwitcher();
	if (status === "loading") {
		return <CustomSpinner size="large" tip="Loading..." />;
	}

	return (
		<BrowserRouter>
			<ErrorBoundary FallbackComponent={ErrorFallback} >
				<Suspense fallback={<CustomSpinner size="large" tip="Loading..." />}>
					<Route path={"/"}>
						<Switch>
							<RouteProvider>
								<BaseLayout>
									<ErrorBoundary FallbackComponent={ErrorFallback}>
										<Suspense fallback={<CustomSpinner size="large" tip="Loading..." />}>
											<Route path={ROUTES.SIGN_UP} exact component={Signup} />
											<Route path={ROUTES.APPLICATION} exact component={ServicesTable} />
											<Route
												path={ROUTES.SERVICE_METRICS}
												exact
												component={ServiceMetrics}
											/>
											<Route path={ROUTES.SERVICE_MAP} exact component={ServiceMap} />
											<Route path={ROUTES.TRACES} exact component={TraceDetail} />
											<Route path={ROUTES.TRACE_GRAPH} exact component={TraceGraph} />
											<Route path={ROUTES.SETTINGS} exact component={SettingsPage} />
											<Route
												path={ROUTES.INSTRUMENTATION}
												exact
												component={InstrumentationPage}
											/>
											<Route
												path={ROUTES.USAGE_EXPLORER}
												exactexact
												component={UsageExplorer}
											/>
											<Route
												path="/"
												exact
												render={() => {
													return localStorage.getItem(IS_LOGGED_IN) === "yes" ? (
														<Redirect to={ROUTES.APPLICATION} />
													) : (
														<Redirect to={ROUTES.SIGN_UP} />
													);
												}}
											/>
										</Suspense>
									</ErrorBoundary>
								</BaseLayout>
							</RouteProvider>
						</Switch>
					</Route>
				</Suspense>
			</ErrorBoundary>
		</BrowserRouter>
	);
};

export default App;