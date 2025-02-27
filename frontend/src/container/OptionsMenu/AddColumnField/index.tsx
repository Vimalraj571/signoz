import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Typography from 'antd/es/typography/Typography';
import { useIsDarkMode } from 'hooks/useDarkMode';
import { useTranslation } from 'react-i18next';

import { FieldTitle } from '../styles';
import { OptionsMenuConfig } from '../types';
import {
	AddColumnItem,
	AddColumnSelect,
	AddColumnWrapper,
	DeleteOutlinedIcon,
	SearchIconWrapper,
} from './styles';

function AddColumnField({ config }: AddColumnFieldProps): JSX.Element | null {
	const { t } = useTranslation(['trace']);
	const isDarkMode = useIsDarkMode();

	if (!config) return null;

	return (
		<AddColumnWrapper direction="vertical">
			<FieldTitle>{t('options_menu.addColumn')}</FieldTitle>

			<Input.Group compact>
				<AddColumnSelect
					size="small"
					mode="multiple"
					placeholder="Search"
					options={config.options}
					value={[]}
					onChange={config.onChange}
				/>
				<SearchIconWrapper $isDarkMode={isDarkMode}>
					<SearchOutlined />
				</SearchIconWrapper>
			</Input.Group>

			{config.value?.map(({ key, id }) => (
				<AddColumnItem direction="horizontal" key={id}>
					<Typography>{key}</Typography>
					<DeleteOutlinedIcon onClick={(): void => config.onRemove(id as string)} />
				</AddColumnItem>
			))}
		</AddColumnWrapper>
	);
}

interface AddColumnFieldProps {
	config: OptionsMenuConfig['addColumn'];
}

export default AddColumnField;
