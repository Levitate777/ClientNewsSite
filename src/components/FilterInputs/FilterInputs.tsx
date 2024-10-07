import { Flex, Input, Select } from 'antd';

import { IFilterState, SortState } from '../../hooks/useFilter';

import styles from './FilterInputs.module.css'; 

interface IFilterInputs {
	filter: IFilterState,
	setFilter: (arg: IFilterState) => void,
}

const FilterInputs = ({
	filter,
	setFilter,
}: IFilterInputs) => {
	const optionsSelect = [
		{
			value: 'all',
			label: 'All',
		},
		{
			value: 'text',
			label: 'Text',
		},
		{
			value: 'title',
			label: 'Title',
		},
		{
			value: 'tag',
			label: 'Tag',
		},
		{
			value: 'author',
			label: 'Author',
		},
	];

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(filter);
    setFilter({ ...filter, query: e.target.value });
  };

  const handleSelectChange = (value: SortState) => {
		console.log(filter);
    setFilter({ ...filter, sort: value });
  };

	return (
		<Flex className={styles.filter__container} gap={'small'}>
			<Input 
        placeholder="Enter text" 
        value={filter.query} 
        onChange={handleInputChange}
				className={styles.filter__input}
      />
      <Select  
				defaultActiveFirstOption
        placeholder="Select filter"
        value={filter.sort}
        onChange={handleSelectChange}
				variant="filled"
				optionFilterProp="value"
				options={optionsSelect}
				className={styles.filter__select}
      />
		</Flex>
	);
};

export default FilterInputs;
