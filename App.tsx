import { LoaderScreen } from './src/screens';
import { ThemeProvider } from './src/context';
import RootStack from './src/navigators/RootStack';
import { useAssetLoader } from './src/hooks';

export default function App() {
  const { isLoading } = useAssetLoader();

  if (isLoading) {
    return <LoaderScreen />;
  }
  return (
    <ThemeProvider>
      <RootStack />
    </ThemeProvider>
  );
}
