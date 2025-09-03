import { Layout, Typography } from "antd";

export default function PageHeader() {
    return (
        <Layout.Header style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center"}}>
            <Typography.Title level={4} style={{ color: "white", margin: 0, textAlign: "center" }}>
                Gerenciamento de Mídias
            </Typography.Title>
        </Layout.Header>
    );
}