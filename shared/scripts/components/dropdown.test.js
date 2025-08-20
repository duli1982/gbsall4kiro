import { describe, it, expect, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { initializeDropdown } from './dropdown.js';

describe('Dropdown Component', () => {

    let dropdown, button, menu;

    beforeEach(() => {
        // Set up the DOM
        document.body.innerHTML = `
            <div data-dropdown>
                <button data-dropdown-button>Tools</button>
                <div data-dropdown-menu class="hidden opacity-0 scale-95">
                    <a href="#">Item 1</a>
                </div>
            </div>
            <div id="outside">Outside</div>
        `;

        dropdown = document.querySelector('[data-dropdown]');
        button = document.querySelector('[data-dropdown-button]');
        menu = document.querySelector('[data-dropdown-menu]');

        // Initialize the component
        initializeDropdown(dropdown);
    });

    it('should toggle the menu when the button is clicked', async () => {
        const user = userEvent.setup();
        // Menu should initially be hidden
        expect(menu.classList.contains('hidden')).toBe(true);

        // First click: open the menu
        await user.click(button);
        // Using a timeout because the component has timeouts for animations
        await new Promise(r => setTimeout(r, 150));
        expect(menu.classList.contains('hidden')).toBe(false);
        expect(menu.classList.contains('opacity-100')).toBe(true);

        // Second click: close the menu
        await user.click(button);
        await new Promise(r => setTimeout(r, 150));
        expect(menu.classList.contains('hidden')).toBe(true);
        expect(menu.classList.contains('opacity-0')).toBe(true);
    });

    it('should close the menu when clicking outside the dropdown', async () => {
        const user = userEvent.setup();
        // First, open the menu
        await user.click(button);
        await new Promise(r => setTimeout(r, 150));
        expect(menu.classList.contains('hidden')).toBe(false);

        // Now, click outside
        const outsideElement = document.getElementById('outside');
        await user.click(outsideElement);
        await new Promise(r => setTimeout(r, 150));
        expect(menu.classList.contains('hidden')).toBe(true);
    });

    it('should close the menu when an item inside the menu is clicked', async () => {
        const user = userEvent.setup();
        // First, open the menu
        await user.click(button);
        await new Promise(r => setTimeout(r, 150));
        expect(menu.classList.contains('hidden')).toBe(false);

        // Now, click a menu item
        const menuItem = menu.querySelector('a');
        await user.click(menuItem);
        await new Promise(r => setTimeout(r, 150));
        expect(menu.classList.contains('hidden')).toBe(true);
    });
});
