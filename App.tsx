import { LoaderScreen } from './src/screens';
import { AppStateProvider, AuthProvider, ThemeProvider } from './src/context';
import { useAssetLoader } from './src/hooks';
import Root from './src/navigators/StartNavigator';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function App() {
  const queryClient = new QueryClient();
  const { isLoading } = useAssetLoader();

  if (isLoading) {
    return <LoaderScreen />;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <AppStateProvider>
            <Root />
          </AppStateProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
