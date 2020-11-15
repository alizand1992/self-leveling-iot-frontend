import React from 'react';

import {
    shallow
} from 'enzyme';

import Menu from '../../../Components/Common/Menu';

//1st when sign in 
describe('Menu tests', () => {
    const wrapper = shallow( < Menu / > );

    it('Properties are present', () => {
        expect(wrapper.find('Navbar').length).toEqual(1);
        expect(wrapper.find('Nav').length).toEqual(1);
        expect(wrapper.find('NavbarBrand').length).toEqual(1);
        expect(wrapper.find('NavbarToggle').length).toEqual(1);
        expect(wrapper.find('NavbarCollapse').length).toEqual(1);
        expect(wrapper.find({
          to: '/notifications'
        }).text()).toBe("List Notifications");
        expect(wrapper.find({
          to: '/notifications/new'
        }).text()).toBe("Create Notification");
    });

    describe('Signed Out', () => {
        it('Testing if Signout Components are present', () => {
            expect(wrapper.find('NavDropdown').length).toEqual(2);
            expect(wrapper.find({
                to: '/user/sign_in'
            }).text()).toBe("Sign In");
            expect(wrapper.find({
                to: '/user/sign_up'
            }).text()).toBe("Sign Up");
        });

    });

    //mock sign in code
    describe('Signed In', () => {
        beforeEach(() => {
            let localStorageMock = (function() {
                let store = {
                    'authorization': true,
                };

                return {
                    getItem: function(key) {
                        return store[key] || null;
                    },
                    setItem: function(key, value) {
                        store[key] = value.toString();
                    },
                    clear: function() {
                        store = {};
                    }
                };

            })();

            Object.defineProperty(window, 'localStorage', {
                value: localStorageMock,
                writable: true
            });
            window.localStorage = localStorageMock;

        })


        it('Testing if Signout Components are present', () => {
            const signedInWrapper = shallow( < Menu / > );
            expect(signedInWrapper.find('NavDropdown').length).toEqual(2);
            expect(signedInWrapper.find({
                to: '/user/profile'
            }).text()).toBe("Profile");
            expect(signedInWrapper.find({
                to: '/user/sign_out'
            }).text()).toBe("Sign Out");
        });

    });
});