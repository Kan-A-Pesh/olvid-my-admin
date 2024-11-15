import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useItemQuery<T extends { id: string }>({
    id,
    queryKey,
    queryFn,
}: {
    id?: string;
    queryKey: string[];
    queryFn: (id: string) => Promise<T>;
}) {
    return useQuery({
        queryKey: [...queryKey, id],
        queryFn: () => queryFn(id as string),
        enabled: !!id,
    });
}

export function useItemsQuery<T extends { id: string }>({
    queryKey,
    queryFn,
}: {
    queryKey: string[];
    queryFn: () => Promise<T[] | { [id: string]: T }>;
}) {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: [...queryKey],
        queryFn: async () => {
            const items = await queryFn();

            // Populate the cache with the items
            Object.entries(items).forEach(([id, value]) => {
                queryClient.setQueryData([...queryKey, id], value);
            });

            return items;
        },
    });
}
