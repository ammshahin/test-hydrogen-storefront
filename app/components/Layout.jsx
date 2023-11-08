import {Suspense} from 'react';
import {Aside} from './Aside';
import {Header} from './Header';
import {Await} from '@remix-run/react';
import {CartMain} from './Cart';
import { PredictiveSearchForm, PredictiveSearchResults } from './Search';

export const Layout = ({cart, children = null, footer, header, isLoggedIn}) => {
  return (
    <>
      <CartAside cart={cart} />
      <SearchAside />
      <Header header={header} cart={cart} isLoggedIn={isLoggedIn} />
      <main>{children}</main>
    </>
  );
};

function CartAside({cart}) {
  return (
    <div className="cart-aside" >
    <Aside id="cart-aside" heading="CART">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
    </div>
  );
}

function SearchAside() {
  return (
    <Aside id="search-aside" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <PredictiveSearchForm>
          {({fetchResults, inputRef}) => (
            <div>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
              />
              &nbsp;
              <button type="submit">Search</button>
            </div>
          )}
        </PredictiveSearchForm>
        <PredictiveSearchResults />
      </div>
    </Aside>
  );
}