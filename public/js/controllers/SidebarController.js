app.controller('SidebarController', function() {
    $('.left.sidebar').first()
        .sidebar('attach events', '#sidebar-button')
    ;
});