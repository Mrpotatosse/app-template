import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useApi } from "~/client/contexts/api/hook";

export default function GoogleCallbackPage() {
    const { t } = useTranslation();
    const { api } = useApi();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        api["user/auth"]
            .query({
                code: searchParams.get("code") ?? "",
            })
            .then(console.log);
    }, [searchParams]);

    return (
        <div className="flex justify-center items-center w-full h-full min-h-0 min-w-0">
            {t("app.loading...")}
            <button
                onClick={() =>
                    api["user/auth"]
                        .query({
                            code: searchParams.get("code") ?? "",
                        })
                        .then(console.log)
                }
            >
                zob
            </button>
        </div>
    );
}
