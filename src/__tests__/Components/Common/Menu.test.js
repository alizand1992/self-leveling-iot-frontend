import React from 'react';

import { shallow } from 'enzyme';

import Menu from '../../../Components/Common/Menu';

//1st when sign in 
  describe('Menu tests', () => {
    const wrapper = shallow(<Menu/>);

    it('Properties are present', () => {
      expect(wrapper.find('Navbar').length).toEqual(1);
      expect(wrapper.find('Nav').length).toEqual(1);
      expect(wrapper.find('NavbarBrand').length).toEqual(1);
      //add list notif, create noti
      //add everything
    });

    describe('Signed Out', () => {
      it('Testing if Signout Components are present', () => {
        expect(wrapper.find('NavDropdown').length).toEqual(2);
        expect(wrapper.find({ to: '/user/sign_in' }).text()).toBe("Sign In");
        expect(wrapper.find({ to: '/user/sign_up' }).text()).toBe("Sign Up");
      });
    
    });

    //mock sign in code
    describe('Signed In', () => {
      beforeEach(() =>{let localStorageMock = (function() {
        let store = {
          'authorization':true,
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
      window.localStorage =localStorageMock;
    
    })
  

      it('Testing if Signout Components are present', () => {
        const signedInWrapper = shallow(<Menu/>);        
        expect(signedInWrapper.find('NavDropdown').length).toEqual(2);
        expect(signedInWrapper.find({ to: '/user/profile' }).text()).toBe("Profile");
        expect(signedInWrapper.find({ to: '/user/sign_out' }).text()).toBe("Sign Out");
      });

    });
  });
    /*
  beforeEach(() => {
    store = mockStore({
      user: {}
    });
    wrapper = shallow(<SignIn store={store} />).dive().dive();
  });

  it('has a User Profile', () => {
    expect(wrapper.find('/user/Profile')).toHaveLength(1);
  });

  it('has a sign_out', () => {
    expect(wrapper.find('/user/sign_out')).toHaveLength(1);
  });

  it('has an sign_in', () => {
    expect(wrapper.find('user/sign_in' )).toHaveLength(1);
  });

  it('has a List Notifications', () => {
    expect(wrapper.find('/notifications')).toHaveLength(1);
  });
  
  it('has a sign_up', () => {
    expect(wrapper.find('/notifications/new')).toHaveLength(1);
  });*/
  


  //2nd signed out 