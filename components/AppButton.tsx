import { Button, ButtonProps } from "@chakra-ui/react";

interface Props extends ButtonProps {
  title?: any;
}
const AppButton: React.FC<Props> = (props) => {
  const { title } = props;
  return <Button {...props}>{title}</Button>;
};

export default AppButton;
