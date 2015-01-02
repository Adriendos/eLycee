app.controller('SidebarCtrl', function() {
    $('.left.sidebar').first()
        .sidebar('attach events', '#sidebar-button')
    ;
});