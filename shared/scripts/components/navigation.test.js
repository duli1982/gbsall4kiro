import { describe, it, expect, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { initializeNavigation } from './navigation.js';

describe('Navigation Component', () => {

    let openBtn, closeBtn, menu, overlay, menuItem;

    beforeEach(() => {
        // Set up the DOM
        document.body.innerHTML = `
            <button data-mobile-menu-button>Open</button>
            <div data-mobile-menu>
                <button data-mobile-menu-close>Close</button>
                <a href="#" data-mobile-menu-item>Link</a>
            </div>
            <div data-mobile-menu-overlay></div>
        `;

        openBtn = document.querySelector('[data-mobile-menu-button]');
        closeBtn = document.querySelector('[data-mobile-menu-close]');
        menu = document.querySelector('[data-mobile-menu]');
        overlay = document.querySelector('[data-mobile-menu-overlay]');
        menuItem = document.querySelector('[data-mobile-menu-item]');

        // Initialize the component
        initializeNavigation();
    });

    it('should open the menu when the open button is clicked', async () => {
        const user = userEvent.setup();
        expect(menu.classList.contains('active')).toBe(false);
        expect(overlay.classList.contains('active')).toBe(false);

        await user.click(openBtn);

        expect(menu.classList.contains('active')).toBe(true);
        expect(overlay.classList.contains('active')).toBe(true);
    });

    it('should close the menu when the close button is clicked', async () => {
        const user = userEvent.setup();
        // First open the menu
        await user.click(openBtn);
        expect(menu.classList.contains('active')).toBe(true);

        // Now close it
        await user.click(closeBtn);
        expect(menu.classList.contains('active')).toBe(false);
        expect(overlay.classList.contains('active')).toBe(false);
    });

    it('should close the menu when the overlay is clicked', async () => {
        const user = userEvent.setup();
        // First open the menu
        await user.click(openBtn);
        expect(menu.classList.contains('active')).toBe(true);

        // Now click the overlay
        await user.click(overlay);
        expect(menu.classList.contains('active')).toBe(false);
        expect(overlay.classList.contains('active')).toBe(false);
    });

    it('should close the menu when a menu item is clicked', async () => {
        const user = userEvent.setup();
        // First open the menu
        await user.click(openBtn);
        expect(menu.classList.contains('active')).toBe(true);

        // Now click a menu item
        await user.click(menuItem);
        expect(menu.classList.contains('active')).toBe(false);
        expect(overlay.classList.contains('active')).toBe(false);
    });
});
