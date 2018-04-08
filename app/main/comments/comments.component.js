'use strict';

angular.module('comments')
    .component('comments', {
        templateUrl: 'main/comments/comments.html',
        css: 'main/comments/comments.css',
        controller: CommentsController,
        bindings: {
            item: '=',
            itemPositionNumber: '<'
        }
    });

CommentsController.$inject = ['$scope', 'commentsStorageService'];

function CommentsController($scope, commentsStorageService) {
    const vm = this;
    vm.$onInit = onInit;
    vm.currentComment = '';

    function onInit() {
        vm.comments = commentsStorageService.getAllByItemId(vm.item.id) || [];
        vm.itemPositionNumber = localStorage.getItem('itemPositionNumber');
    }

    vm.addComment = function () {
        if (vm.currentComment !== null && vm.currentComment.trim().length > 0) {
            let commentObj = {
                id: new Date().getTime(),
                value: vm.currentComment,
                avatarColor: '#' + Math.floor(Math.random() * 16777215).toString(16)
            };
            vm.comments.push(commentObj);
            commentsStorageService.saveComment(vm.item.id, commentObj);
            vm.item.commentsCount += 1;
            vm.currentComment = '';
        }
    };

    $scope.$watch(() => this.item, (changedItem) => {
        if (changedItem) {
            vm.comments = commentsStorageService.getAllByItemId(changedItem.id) || [];
        }
    });
}