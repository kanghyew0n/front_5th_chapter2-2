import { CartPage } from "./pages/CartPage.tsx";
import { AdminPage } from "./pages/AdminPage.tsx";
import { useCoupons, useProducts } from "./hooks";
import { initialCoupons, initialProducts } from "./mock/initData.ts";
import Header from "./components/common/Header.tsx";
import { useAdminMode } from "./hooks/useAdminMode.ts";

const App = () => {
  const { isAdmin, toggleAdmin } = useAdminMode();
  const { coupons, addCoupon } = useCoupons(initialCoupons);
  const { products, updateProduct, addProduct } = useProducts(initialProducts);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header isAdmin={isAdmin} toggleAdmin={toggleAdmin} />
      <main className="container mx-auto mt-6">
        {isAdmin ? (
          <AdminPage
            products={products}
            coupons={coupons}
            onProductUpdate={updateProduct}
            onProductAdd={addProduct}
            onCouponAdd={addCoupon}
          />
        ) : (
          <CartPage products={products} coupons={coupons} />
        )}
      </main>
    </div>
  );
};

export default App;
