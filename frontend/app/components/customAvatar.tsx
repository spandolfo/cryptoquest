import { Types } from "connectkit";
import DynamicSVG from './seedSvg';

const CustomAvatar = ({ address, ensImage, ensName, size, radius }: Types.CustomAvatarProps) => {
  return (
    <div
      style={{
        overflow: "hidden",
        borderRadius: radius,
        height: size,
        width: size,
      }}
    >
    <DynamicSVG ethAddress={String(address)} size={String(size)} /> 
    </div>
  );
};

export default CustomAvatar;