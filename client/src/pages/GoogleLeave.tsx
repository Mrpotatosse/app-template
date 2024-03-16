import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useApi } from "~/client/contexts/api/hook";
import { useAppState } from "~/client/contexts/state/hook";

export default function GoogleLeavePage() {
    const { t } = useTranslation();
    const { api } = useApi();
    const app = useAppState();
    const navigate = useNavigate();

    useEffect(() => {
        api["user/leave"].query({}).then(() => {
            app.user = undefined;
            navigate("/");
        });
    }, []);

    return (
        <div className="flex justify-center items-center w-full h-full min-h-0 min-w-0">
            {t("app.loading...")}
        </div>
    );
}
