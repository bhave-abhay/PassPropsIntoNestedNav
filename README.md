# PassPropsIntoNestedNav

This is a demonstration for missing props in nested react-native navigators

### Current Behavior

Structure is as follows

 - Switch navigator
   - Splash (Route 'Splash')
   - Drawer Navigator (Route 'App')
     - Stack Navigator (Route 'AppStack', default route in 'App')
       - Bottom Tab Navigator (Route 'HomeScreen', default in 'AppStack' route)
         - Tab 1 (Route 'HomeTab1', default in 'HomeScreen' route)
         - Tab 2 (Route 'HomeTab2')
       - Other screen (Route 'OtherScreen')
     - Drawer Component

 1. Splash stays for 5 seconds,
     - ![screenshot_1551521157](https://user-images.githubusercontent.com/9031711/53680400-19e1c980-3d01-11e9-85ba-ecd1bea1e7b9.png)

     - delay is to simulate, for instance, asynchronously getting user info
     - Once user info is available, I want to keep passing it throughout the app
 1. On timeout, it navigates to 'App' **with params**
     - this.props.navigation.navigate('App', {propFoo: 'Foo', propBar: 'Bar'}); 
 1. App loads the HomeScreen with HomeTab1 as active screen.
     - ![screenshot_1551521162](https://user-images.githubusercontent.com/9031711/53680423-5b727480-3d01-11e9-9b7f-8eba300f6ffc.png)
     - Drawer works well. I **DO** get these params {propFoo: 'Foo', propBar: 'Bar'} correctly in Drawer
     - ![screenshot_1551521172](https://user-images.githubusercontent.com/9031711/53680436-95dc1180-3d01-11e9-8ed9-53af06b47870.png)
 1. At this moment, Tab1 and Tab2 both do not get the param, and shows fallback
     - Tab1 shows fallback set for Tab1
     - ![screenshot_1551521162](https://user-images.githubusercontent.com/9031711/53680443-ad1aff00-3d01-11e9-9e68-9f8f0093d121.png)
     - Tab2 shows fallback set for Tab2. Good enough.
     - ![screenshot_1551521167](https://user-images.githubusercontent.com/9031711/53680447-c4f28300-3d01-11e9-8cfd-315475b2bfc0.png)
     - This can be varified by **navigating from bottom tabs**
 1. Also, Tab1 also lets you to navigate to Tab2 **with params it found** (These are Tab1 Fallbacks)
    - Now, the Tab2 shows values as Fallback from Tab1. 
    - ![screenshot_1551521846](https://user-images.githubusercontent.com/9031711/53680493-8e693800-3d02-11e9-94fc-5697df913ac3.png)
    - Still going ok.
 1. But once the above step is executed, **Tab2 now always shows the Tab1 Params** even if navigated using bottom tabs!

### Expected Behavior
 - When I navigate to Tab2 using Bottom nav, I should at least get no params, and definitely not params passed in **last navigation** to this route
 - It will be great to have a way to propagate the params to the tabs of a tab navigator.
   - For instance, user info might be necessary on many such screens, and getting it from outside, like local storage or with a web service call will be an unnecessary overhead

### Environment

| software         | version
| ---------------- | -------
| react-navigation | 3.3.2
| react-native     | 0.58.6
| node             | 8.9.2
| npm or yarn      | yarn 1.9.4
