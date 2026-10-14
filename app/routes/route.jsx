import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";

export default function App() {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
}
