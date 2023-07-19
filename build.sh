echo "[Starting introPage build script...]"

echo "[packages install...]"
sudo apt-get update
sudo apt-get install docker-compose python3 python3-pip libmysqlclient-dev -y
pip3 install django
pip3 install python-dotenv
pip3 install mysqlclient
pip3 install djangorestframework
pip3 install markdown
pip3 install django-filter
echo "[packages install is done.]"

echo "[Docker-compose build...]"
sudo docker-compose up -d
echo "[Docker-compose build is done.]"
echo "[Waiting for introPageDB to initialize...]"
sleep 1m

echo "[django_app build...]"
cd django_app
python3 manage.py makemigrations
python3 manage.py migrate
echo "[Please create superuser.]"
python3 manage.py createsuperuser
echo "[django_app build is done.]"
python3 manage.py runserver

echo "[introPage build script is done.]"