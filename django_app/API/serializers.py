from rest_framework import serializers
from .models import User, Tag, Category, Post, Comment
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        read_only_fields = ('created_at', 'updatead_at', 'last_login', 'is_active', 'is_admin', 'is_superuser', 'groups', 'user_permissions')

    def create(self, validated_data):
        userid = validated_data.get('userid')
        nickname = validated_data.get('nickname')
        email = validated_data.get('email')
        password = validated_data.get('password')
        
        user = User.objects.create_user(
            userid=userid,
            nickname=nickname,
            email=email,
            password=password
        )
        user.set_password(password)
        user.save()
        return user
    
    def update(self, instance, validated_data):
        instance.userid = validated_data.get('userid', instance.userid)
        instance.nickname = validated_data.get('nickname', instance.nickname)
        instance.email = validated_data.get('email', instance.email)
        instance.password = validated_data.get('password', instance.password)
        instance.set_password(instance.password)
        instance.save()
        return instance
    
class UserExcludePasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password',)

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        
class PostExcludePasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('postid', 'userid', 'categoryid', 'tagid', 'title', 'content', 'created_at', 'updated_at', 'is_published', 'is_secret', 'published_at')

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'