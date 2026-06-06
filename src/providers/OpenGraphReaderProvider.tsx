import MockOpenGraphReaderProvider from "../features/opengraph-reader/providers/MockOpenGraphReaderProvider";
import OGMetatagReaderProvider from "../features/opengraph-reader/providers/OGMetatagReaderProvider";

export default function OpenGraphReaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  if (import.meta.env.DEV) {
    return (
      <MockOpenGraphReaderProvider>{children}</MockOpenGraphReaderProvider>
    );
  }
  return <OGMetatagReaderProvider>{children}</OGMetatagReaderProvider>;
}
