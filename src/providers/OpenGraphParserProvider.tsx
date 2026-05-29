import MetatagOpenGraphParserProvider from "../features/og-parser/MetatagOpenGraphParserProvider";
import MockOpenGraphParserProvider from "../features/og-parser/MockOpenGraphParserProvider";

export default function OpenGraphParserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  if (import.meta.env.DEV) {
    return (
      <MockOpenGraphParserProvider>{children}</MockOpenGraphParserProvider>
    );
  }
  return (
    <MetatagOpenGraphParserProvider>{children}</MetatagOpenGraphParserProvider>
  );
}
