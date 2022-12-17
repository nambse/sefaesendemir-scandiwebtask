import { PureComponent } from "react";
import { connect } from "react-redux";
import { ReactComponent as Svg } from "../../assets/icons/arrow.svg";
import ProductAttributes from "./ProductAttributes";
import styled from "styled-components";
import { handleCartQuantity } from "../../redux/slices/cartSlice";

const mapStateToProps = (state) => ({
  products: state.cart.products,
});

class Product extends PureComponent {
  state = { GalleryIndex: 0 };

  componentDidMount() {
    this.setState({
      quantity: this.props.quantity,
      image: this.props.gallery[0],
    });
  }

  componentDidUpdate() {
    this.setState({ quantity: this.props.quantity });
  }

  handleImageClick = (event) => {
    const { GalleryIndex } = this.state;
    const { gallery } = this.props;
    event === "left"
      ? this.setState({
          GalleryIndex:
            GalleryIndex === 0 ? gallery.length - 1 : GalleryIndex - 1,
        })
      : this.setState({
          GalleryIndex:
            gallery.length > GalleryIndex + 1 ? GalleryIndex + 1 : 0,
        });
  };

  render() {
    const {
      id,
      brand,
      name,
      prices,
      attributes,
      currentAttributes,
      currentCurrency,
      gallery,
      origin,
    } = this.props;
    const amount = prices?.find(
      ({ currency }) => currency.symbol === currentCurrency
    );
    return (
      <MiniCartProductContainer origin={origin}>
        <MiniCartProductContainerDescription>
          <MiniCartProductBrand>{brand}</MiniCartProductBrand>
          <MiniCartProductName>{name}</MiniCartProductName>
          <MiniCartProductPriceValue>
            {currentCurrency}
            {amount.amount}
          </MiniCartProductPriceValue>
          <ProductAttributes
            attributes={attributes}
            currentAttributes={currentAttributes}
            handleAttributeClick={() => {}}
            origin={origin}
          />
        </MiniCartProductContainerDescription>
        <MiniCartProductContainerCounter>
          <MiniCartProductHandleQuantityButton
            onClick={() =>
              this.props.handleCartQuantity({
                id,
                currentAttributes,
                operator: "increment",
              })
            }
            origin={origin}
          >
            +
          </MiniCartProductHandleQuantityButton>
          {this.state.quantity}
          <MiniCartProductHandleQuantityButton
            onClick={() =>
              this.props.handleCartQuantity({
                id,
                currentAttributes,
                operator: "decrement",
              })
            }
            origin={origin}
          >
            &ndash;
          </MiniCartProductHandleQuantityButton>
        </MiniCartProductContainerCounter>
        <MiniCartProductBox>
          <MiniCartProductImage src={gallery[this.state.GalleryIndex]} />
          {origin === "page" && gallery.length > 1 && (
            <>
              <ProductArrowLeft onClick={() => this.handleImageClick("left")} />
              <ProductArrowRight
                onClick={() => this.handleImageClick("right")}
              />
            </>
          )}
        </MiniCartProductBox>
      </MiniCartProductContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleCartQuantity: (id, currentAttributes, operator) =>
      dispatch(handleCartQuantity(id, currentAttributes, operator)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);

//styling

const MiniCartProductContainerDescription = styled.div`
  margin-inline-end: auto;
`;

const MiniCartProductBrand = styled.h3``;

const MiniCartProductName = styled.h3``;

const MiniCartProductPriceValue = styled.p``;

const MiniCartProductContainerCounter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const MiniCartProductHandleQuantityButton = styled.div`
  font-weight: 500;
  line-height: ${(props) => (props.children === "+" ? "160%" : "135%")};
  text-align: center;
  border: 1px solid var(--main-text-color);
  cursor: pointer;
`;

const MiniCartProductBox = styled.div`
  position: relative;
`;

const MiniCartProductImage = styled.img`
  object-fit: contain;
`;

const ProductArrowLeft = styled(Svg)`
  transform: rotate(90deg);
  position: absolute;
  padding: 6px;
  width: 24px;
  height: 24px;
  bottom: 16px;
  right: 48px;
  stroke: white;
  background-color: rgba(0, 0, 0, 0.73);
  cursor: pointer;
  path {
    stroke: white;
  }
`;

const ProductArrowRight = styled(Svg)`
  transform: rotate(-90deg);
  position: absolute;
  padding: 6px;
  width: 24px;
  height: 24px;
  bottom: 16px;
  right: 16px;
  background-color: rgba(0, 0, 0, 0.73);
  cursor: pointer;
  path {
    stroke: white;
  }
`;

const MiniCartProductContainer = styled.li`
  display: flex;
  padding: ${(props) => (props.origin === "page" ? "24px 0" : "0")};
  width: ${(props) => (props.origin === "page" ? "100%" : "293px")};
  border-top: ${(props) =>
    props.origin === "page" ? "1px solid #e5e5e5" : "0"};
  min-height: ${(props) => (props.origin === "page" ? "100px" : "190px")};

  &:not(:last-child) {
    margin-bottom: ${(props) => (props.origin === "page" ? "0" : "40px")};
  }

  &:last-child {
    border-bottom: ${(props) =>
      props.origin === "page" ? "1px solid #e5e5e5" : "0"};
  }

  @media (max-width: 1024px) {
    padding: ${(props) =>
      props.origin === "page" ? "calc(24 / 1024 * 100vw) 0" : "0"};
  }

  ${MiniCartProductContainerDescription} {
    width: ${(props) => (props.origin === "page" ? "" : "136px")};
    min-height: ${(props) => (props.origin === "page" ? "100px" : "190px")};
  }

  ${MiniCartProductBrand} {
    font-weight: ${(props) => (props.origin === "page" ? "600" : "300")};
    font-size: ${(props) => (props.origin === "page" ? "30px" : "16px")};
    line-height: ${(props) => (props.origin === "page" ? "27px" : "160%")};

    @media (max-width: 1024px) {
      font-size: ${(props) =>
        props.origin === "page" ? "calc(30 / 1024 * 100vw)" : "16px"};
    }
  }

  ${MiniCartProductName} {
    margin: ${(props) =>
      props.origin === "page"
        ? "calc(16 / 1440 * 100vw) 0 calc(20 / 1440 * 100vw)"
        : "0 0 4px"};
    font-weight: ${(props) => (props.origin === "page" ? "400" : "300")};
    font-size: ${(props) => (props.origin === "page" ? "30px" : "16px")};
    line-height: ${(props) => (props.origin === "page" ? "27px" : "160%")};

    @media (max-width: 1024px) {
      font-size: ${(props) =>
        props.origin === "page" ? "calc(30 / 1024 * 100vw)" : "16px"};
    }

    @media (min-width: 1440px) {
      margin: ${(props) =>
        props.origin === "page" ? "16px 0 20px" : "0 0 4px"};
    }
  }

  ${MiniCartProductPriceValue} {
    margin-bottom: ${(props) =>
      props.origin === "page" ? "calc(20 / 1440 * 100vw)" : "8px"};
    font-weight: ${(props) => (props.origin === "page" ? "700" : "500")};
    font-size: ${(props) => (props.origin === "page" ? "24px" : "16px")};
    line-height: ${(props) => (props.origin === "page" ? "24px" : "160%")};

    @media (max-width: 1024px) {
      font-size: ${(props) =>
        props.origin === "page" ? "calc(24 / 1024 * 100vw)" : "16px"};
    }

    @media (min-width: 1440px) {
      margin: ${(props) =>
        props.origin === "page" ? "16px 0 20px" : "0 0 4px"};
    }
  }

  ${MiniCartProductContainerCounter} {
    margin: ${(props) =>
      props.origin === "page" ? "0 24px 0 0" : "0 8px 0 4px"};
    width: ${(props) => (props.origin === "page" ? "45px" : "24px")};
    min-height: ${(props) => (props.origin === "page" ? "100px" : "190px")};
  }

  ${MiniCartProductHandleQuantityButton} {
    width: ${(props) => (props.origin === "page" ? "45px" : "24px")};
    height: ${(props) => (props.origin === "page" ? "45px" : "24px")};
    font-size: ${(props) => (props.origin === "page" ? "20px" : "15px")};
    line-height: ${(props) => (props.origin === "page" ? "43px" : "")};

    @media (max-width: 1024px) {
      width: ${(props) =>
        props.origin === "page" ? "calc(45 / 1024 * 100vw)" : "24px"};
      height: ${(props) =>
        props.origin === "page" ? "calc(45 / 1024 * 100vw)" : "24px"};
      line-height: ${(props) =>
        props.origin === "page" ? "calc(43 / 1024 * 100vw)" : ""};
    }
  }

  ${MiniCartProductImage} {
    width: ${(props) => (props.origin === "page" ? "200px" : "121px")};
    height: ${(props) => (props.origin === "page" ? "288px" : "190px")};
    align-self: center;

    @media (max-width: 1024px) {
      width: ${(props) =>
        props.origin === "page" ? "calc(200 / 1024 * 100vw)" : "121px"};
      height: ${(props) =>
        props.origin === "page" ? "calc(288 / 1024 * 100vw)" : "190px"};
    }
  }
`;
