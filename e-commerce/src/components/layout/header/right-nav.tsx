import ShoppingCartIcon from '@/components/common/icons/shopping-cart-icon';
import ProfileIcon from '@/components/common/icons/profile-icon';

const RightNav = () => {
  return (
    <div className="flex items-center gap-6">
      <ShoppingCartIcon />
      <ProfileIcon />
    </div>
  );
};

export default RightNav;
