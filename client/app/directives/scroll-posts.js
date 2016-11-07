app.directive('scrollPosts',function ($timeout, $http) {
		var el;

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {console.log('directive.scrollPosts');

					// Nie pracuje w Firefoxie !
					var wait = function(){
						if($http.pendingRequests.length > 0) {
							$(element).scrollTop($(element)[0].scrollHeight);
						} else {
							$timeout(wait,1);
						}
					};
					wait();

					scope.$watch('posts.store',function(){
						$(element).scrollTop($(element)[0].scrollHeight);
					},true);
        }
    };
});