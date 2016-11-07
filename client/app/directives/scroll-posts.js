app.directive('scrollPosts', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {console.log('directive.scrollPosts');

					scope.$watch('posts.store',function(){
						$(element).scrollTop($(element)[0].scrollHeight);
					},true);
        }
    };
});