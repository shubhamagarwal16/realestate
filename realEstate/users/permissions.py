# Permission class that django rest framework uses to determine if the user has the permission to make the change user is asking

from rest_framework import permissions

class UpdateOwnProfile(permissions.BasePermissions):
    """ Allows users to edit their own profiles """

    def has_object_permission(self, request, view, obj):
        """ Check user is trying to edit their own profile """

        if request.method in permissions.SAFE_METHODS:
            return True
