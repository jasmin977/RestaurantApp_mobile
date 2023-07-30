import { LoaderScreen } from './src/screens';
import { AppStateProvider, AuthProvider, ReviewProvider, ThemeProvider } from './src/context';
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
            <ReviewProvider>
              <Root />
            </ReviewProvider>
          </AppStateProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
