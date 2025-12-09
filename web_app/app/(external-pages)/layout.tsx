import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

export default function ExternalPagesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div>
        <Header />
        <div>{children}</div>
        <Footer />
      </div>
    </>
  );
}
