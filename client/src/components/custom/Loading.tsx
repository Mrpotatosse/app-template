import { useTranslation } from "react-i18next";

export default function LoadingComponent() {
    const { t } = useTranslation();

    return (
        <div className="w-full h-full flex justify-center items-center">
            {t("app.loading")}
        </div>
    );
}
