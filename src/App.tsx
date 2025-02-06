import HeaderSection from "./sections/HeaderSection";
import ProductInfoSection from "./sections/ProductInfoSection";

function App() {
  return (
    <div className="max-w-screen-xl mx-auto grid grid-rows-[auto_1fr] min-h-screen">
      <HeaderSection />
      <main>
        <ProductInfoSection />
      </main>
    </div>
  );
}

export default App;
