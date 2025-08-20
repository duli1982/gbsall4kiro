import { describe, it, expect, beforeEach } from 'vitest';
import { qs } from './dom-helpers.js';

describe('DOM Helpers', () => {

    describe('qs', () => {

        beforeEach(() => {
            // Set up a basic DOM structure for each test
            document.body.innerHTML = `
                <div id="container">
                    <span class="item">Item 1</span>
                    <span class="item">Item 2</span>
                </div>
                <div id="empty-container"></div>
            `;
        });

        it('should return the first element that matches the selector', () => {
            const container = qs('#container');
            expect(container).not.toBeNull();
            const firstItem = qs('.item', { parent: container });
            expect(firstItem).not.toBeNull();
            expect(firstItem.textContent).toBe('Item 1');
        });

        it('should return null if no element is found and not required', () => {
            const nonExistent = qs('.non-existent');
            expect(nonExistent).toBeNull();
        });

        it('should throw an error if no element is found and required is true', () => {
            expect(() => {
                qs('.non-existent', { required: true });
            }).toThrow('Required element with selector ".non-existent" not found in parent.');
        });

        it('should return null when searching inside an empty parent', () => {
            const emptyContainer = qs('#empty-container');
            const item = qs('.item', { parent: emptyContainer });
            expect(item).toBeNull();
        });

        it('should handle the parent option correctly', () => {
            const container = qs('#container');
            const firstItem = qs('.item', { parent: container });
            expect(firstItem.textContent).toBe('Item 1');
        });
    });
});
