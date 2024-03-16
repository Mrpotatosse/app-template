import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApi } from "~/client/contexts/api/hook";
import { useAppState } from "~/client/contexts/state/hook";

export default function GoogleCallbackPage() {
    const { t } = useTranslation();
    const { api } = useApi();
    const app = useAppState();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        api["user/auth"]
            .mutate({
                code: searchParams.get("code") ?? "",
            })
            .then((r) => {
                app.user = r.user;
                navigate("/");
            });
    }, [searchParams]);

    return (
        <div className="flex justify-center items-center w-full h-full min-h-0 min-w-0">
            {t("app.loading...")}
        </div>
    );
}
