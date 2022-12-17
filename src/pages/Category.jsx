import { PureComponent } from "react";
import { getProducts } from "../GraphQL/product";
import ProductCard from "../components/Product/ProductCard";
import withRouter from "../components/HOC/withRouter";
import client from "../GraphQL/apolloClient";
import styled from "styled-components";

//PureComponent is a component that implements shouldComponentUpdate with a shallow prop and state comparison. This prevents unnecessary re-renders due to fetching.

class Category extends PureComponent {
  state = {
    products: [],
  };

  componentDidMount() {
    this.fetchProducts();
  }

  componentDidUpdate() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    const result = await client.query({
      query: getProducts,
      variables: {
        category: this.props.router.params.category || "all",
      },
    });

    this.setState({ products: result.data.category.products });
  };

  categoryName() {
    const categoryName = this.props.router.params.category || "all";
    return categoryName[0].toUpperCase() + categoryName.substring(1);
  }

  render() {
    console.log(this.props);
    const { products } = this.state;
    console.log(products);
    return (
      <>
        <CategoryName>{this.categoryName()}</CategoryName>
        {products.length ? (
          <ProductList>
            {products?.map(
              ({ id, gallery, name, brand, prices, attributes, inStock }) => (
                <ProductCard
                  key={id}
                  id={id}
                  gallery={gallery}
                  brand={brand}
                  name={name}
                  prices={prices}
                  attributes={attributes}
                  inStock={inStock}
                />
              )
            )}
          </ProductList>
        ) : (
          <h1>No product found. Please check your connection.</h1>
        )}
      </>
    );
  }
}

export default withRouter(Category);

//Styling

const CategoryName = styled.h2`
  margin-bottom: calc(103 / 1440 * 100vw);
  padding-top: calc(160 / 1440 * 100vw);
  font-weight: 400;
  font-size: calc(42 / 1440 * 100vw);
  line-height: 160%;

  @media (max-width: 1029px) {
    padding-top: 114px;
    font-size: 30px;
  }

  @media (min-width: 1440px) {
    margin-bottom: 103px;
    padding-top: 160px;
    font-size: 42px;
  }
`;

const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, calc(386 / 1440 * 100vw));
  grid-gap: calc(40 / 1440 * 100vw);
  list-style-type: none;

  @media (max-width: 941px) {
    grid-template-columns: repeat(2, calc(386 / 941 * 100vw));
    grid-gap: calc(40 / 941 * 100vw);
  }

  @media (max-width: 527px) {
    grid-template-columns: repeat(1, calc(386 / 527 * 100vw));
    grid-gap: calc(40 / 527 * 100vw);
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(3, 386px);
    grid-gap: 40px;
  }
`;
