import { Text, TextProps } from "@chakra-ui/react";

interface Props extends TextProps {
  title?: any;
}
const AppText: React.FC<Props> = (props) => {
  const { title } = props;
  return <Text {...props}>{title}</Text>;
};

export default AppText;
