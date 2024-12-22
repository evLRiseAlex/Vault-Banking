import Container from "./index.styled";
import PropTypes from "prop-types";

const TextField = (props) => {
  return (
    <Container>
      <div className="container-text">
        <div>
          {props.isIconVisible ? props.iconChildren : null}
          <input
            id={props.id}
            name={props.name}
            onChange={props.onChange}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            value={props.value}
            placeholder={props.placeholder}
            {...props}
          />
        </div>
      </div>
    </Container>
  );
};

TextField.propTypes = {
  id: PropTypes.string,
  iconChildren: PropTypes.element,
  isIconVisible: PropTypes.bool,
  errorChildren: PropTypes.element,
  isErrorVisible: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.oneOf(["text", "email", "password"]),
};

export default TextField;
