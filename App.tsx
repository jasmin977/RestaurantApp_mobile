import { LoaderScreen } from './src/screens';
import { AuthProvider, ThemeProvider } from './src/context';

import { useAssetLoader } from './src/hooks';
import Root from './src/navigators/StartNavigator';

export default function App() {
  const { isLoading } = useAssetLoader();

  if (isLoading) {
    return <LoaderScreen />;
  }
  return (
    <ThemeProvider>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </ThemeProvider>
  );
}
