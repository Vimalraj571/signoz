import React from "react";
import { Alert, Row, Col } from "antd";
import styled from "styled-components";
import { useErrorHandler } from 'react-error-boundary';

styled(Row)`
    margin: 200;
    justify:space-around;
    align:middle;
`;

export const ErrorFallback = ({ error, resetErrorBoundary }: { error: string, resetErrorBoundary:}) => {
    const [explode, setExplode] = React.useState(false);
    return (
        <Row>
            <Col span={12}>
                <Alert
                    message="Error Something Went Wrong!"
                    showIcon
                    description="Hi Sorry Due to Some technical difficulty this error Happened We are Working hard fix this! Please Reload the Page."
                    type="error"
                />
                <button onClick={resetErrorBoundary}>Try again</button>
            </Col>
        </Row>
    );
};