"use client"
import config from '../../lib/config'
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";
import { ConnectKitButton } from "connectkit";

export const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
    return (
        <Navbar maxWidth="full" onMenuOpenChange={setIsMenuOpen} isBordered>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
          <NavbarBrand>
            <p className="font-bold text-inherit">CryptoQuest</p>
          </NavbarBrand>
        </NavbarContent>
  
        
        <NavbarContent justify="end">
          <NavbarItem>
            <React.Suspense fallback={<div>loading</div>}>
              <ConnectKitButton />
            </React.Suspense>
              
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {config.nav.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                key={index}
                href={item.path}
                size="lg"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      );
  };
