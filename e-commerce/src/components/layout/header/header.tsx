import {
  NavigationMenu,
  NavigationMenuList
} from '@/components/common/ui/navigation-menu';
import Logo from './logo';
import { MenuItem } from './menu-item';
import RightNav from './right-nav';
import MobileHeader from './mobile-header';
import { MENU_LIST } from '@/constants/page';

const Header = () => {
  return (
    <header className="bg-contained fixed top-0 left-0 z-50 w-full py-3 shadow">
      <div className="container m-auto lg:px-3">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Logo />
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {MENU_LIST.map((item) => (
                    <MenuItem
                      key={item.title}
                      title={item.title}
                      url={item.url}
                    />
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <RightNav />
        </nav>

        <MobileHeader />
      </div>
    </header>
  );
};

export default Header;
