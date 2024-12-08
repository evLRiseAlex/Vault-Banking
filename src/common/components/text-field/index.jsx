import Container from "./index.styled";
import PropTypes from "prop-types";

const TextField = (props) => {
  return (
    <Container isErrorVisible={props.isErrorVisible}>
      <div>
        {props.isIconVisible ? props.iconChildren : null}
        <input
          name={props.name}
          onChange={props.onChange}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          value={props.value}
          placeholder={props.placeholder}
        />
        {props.isErrorVisible ? <p>{props.errorChildren}</p> : null}
      </div>
    </Container>
  );
};

TextField.propTypes = {
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
