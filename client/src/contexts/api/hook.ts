import { useContext } from "react";
import { ApiProviderContext } from "~/client/contexts/api/context";

export const useApi = () => {
    const context = useContext(ApiProviderContext);

    if (context === undefined)
        throw new Error("useApi must be used within an ApiProvider");

    return context;
};
