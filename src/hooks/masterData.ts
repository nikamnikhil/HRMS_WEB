import { useMasterDataQuery } from '../stores/masterApi';

export const State = () => {
    const { data, isLoading } = useMasterDataQuery({ entityName: 'STATE' });

    return {
        data: data,
        isLoading: isLoading,
    };
};
