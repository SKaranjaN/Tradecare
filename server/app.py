from flask import Flask, jsonify, request, url_for 
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError
from models import db, User, DataForm
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_mail import Mail, Message

app = Flask(__name__)
CORS(app)
app.config.from_object('config.Config')
db.init_app(app)
migrate = Migrate(app, db)
app.config['JWT_SECRET_KEY'] = 'e6e893630a1f0fb0e61ed4fcd4b3be58564b2d8797387890e92f3b7a4edc94c8'
jwt = JWTManager(app)

# Flask-Mail configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'sakakeja.ke@gmail.com'
app.config['MAIL_PASSWORD'] = 'whem kkaz oqza cakk'
app.config['MAIL_DEFAULT_SENDER'] = 'sakakeja.ke@gmail.com'
mail = Mail(app)

@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        users_list = User.query.all()
        users_dict_list = [user.to_dict() for user in users_list]
        return jsonify(users_dict_list), 200

    elif request.method == 'POST':
        try:
            data = request.get_json()

            if data['email'].endswith('@reactcertafrica.com'):
                user_type = 'admin'
            else:
                user_type = 'user'

            new_user = User(
                firstname=data['firstname'],
                lastname=data['lastname'],
                email=data['email'],
                user_type=user_type,
                password=generate_password_hash(data['password'])
            )

            db.session.add(new_user)
            db.session.commit()

            # Create JWT token
            access_token = create_access_token(identity=new_user.id)

            # Send verification email
            verification_link = url_for('verify_email', token=access_token, _external=True)
            message_body = f"Click the following link to verify your email: {verification_link}"
            msg = Message("Email Verification", recipients=[new_user.email], body=message_body)
            mail.send(msg)

            response_dict = new_user.to_dict()
            return jsonify({'user': response_dict, 'access_token': access_token}), 201

        except IntegrityError:
            db.session.rollback()
            return jsonify({'error': 'Email already exists'}), 400

        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500


#jwt authentication and verification
@app.route('/verify-email/<token>', methods=['GET'])
@jwt_required()
def verify_email(token):
    try:
        current_user = get_jwt_identity()
        user = User.query.get_or_404(current_user)
        user.email_verified = True
        db.session.commit()
        return jsonify({'message': 'Email verified successfully'})

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/users/<int:user_id>', methods=['GET', 'PATCH', 'DELETE'])
def user_by_id(user_id):
    user = User.query.get_or_404(user_id)

    if request.method == 'GET':
        return jsonify(user.to_dict())

    elif request.method == 'PATCH':
        try:
            data = request.get_json()

            user.firstname = data.get('firstname', user.firstname)
            user.lastname = data.get('lastname', user.lastname)
            user.email = data.get('email', user.email)

            db.session.commit()
            return jsonify(user.to_dict())

        except IntegrityError:
            db.session.rollback()
            return jsonify({'error': 'Email already exists'}), 400

        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    elif request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'})
    
    # table dataforms endpoints

@app.route('/dataforms', methods=['GET', 'POST'])
def dataForms():
        if request.method == 'GET':
            forms_list = DataForm.query.all()
            forms_dict_list = [form.to_dict() for form in forms_list]
            return jsonify(forms_dict_list), 200

        elif request.method == 'POST':
            try:
                data = request.get_json()

                new_form = DataForm(
                    region=data['region'],
                    hub_name=data['hub_name'],
                    hub_code=data['hub_code'],
                    address=data['address'],
                    year_established=data['year_established'],
                    ownership=data['ownership'],
                    floor_size=data['floor_size'],
                    facilities=data['facilities'],
                    input_center=data['input_center'],
                    type_of_building=['type_of_building'],
                    gprs_longitude=data['gprs_longitude'],
                    gprs_latitude=data['gprs_latitude'],
                    firstname=data['firstname'],
                    lastname=data['lastname'],
                    id_number=data['id_number'],
                    gender=data['gender'],
                    date_of_birth=['date_of_birth'],
                    email=data['email'],                
                    phone_number = data['phone_number'],
                    lastname2=data['lastname2'],
                    firstname2=data['firstname2'],
                    id_number2=data['id_number2'],
                    gender2=data['gender2'],
                    date_of_birth2=['date_of_birth2'],
                    email2=data['email2'],                
                    phone_number2 = data['phone_number2'] 
                )

                db.session.add(new_form)
                db.session.commit()

                response_dict = new_form.to_dict()
                return jsonify(response_dict), 201
            
            except Exception as e:
                db.session.rollback()
                return jsonify({'error': str(e)}), 500
            
@app.route('/dataforms/<int:form_id>', methods=['GET', 'PATCH', 'DELETE'])
def form_by_id(form_id):
                form = DataForm.query.get_or_404(form_id)

                if request.method == 'GET':
                    return jsonify(form.to_dict())
                elif request.method == 'PATCH':
                    try:
                        data = request.get_json()

                        form.region = data.get('region', form.region)
                        form.hub_name = data.get('hub_name', form.hub_name)
                        form.hub_code = data.get('hub_code', form.hub_code)
                        form.address = data.get('address', form.address),
                        form.ownership = data.get('ownership', form.ownership),
                        form.floor_size = data.get('floor_size', form.floor_size),
                        form.facilities = data.get('facilities', form.facilities),
                        form.input_center = data.get('input_center', form.input_center),
                        form.gprs_longitude = data.get('gprs_longitude', form.gprs_longitude),
                        form.gprs_latitude = data.get('gprs_latitude', form.gprs_latitude),
                        form.id_number = data.get('id_number', form.id_number),
                        form.gender = data.get('gender', form.gender),
                        form.date_of_birth = data.get('date_of_birth', form.date_of_birth),
                        form.phone_number = data.get('phone_number', form.phone_number),
                        form.firstname = data.get('firstname', form.firstname)
                        form.lastname = data.get('lastname', form.lastname)
                        form.email = data.get('email', form.email),
                        form.id_number2 = data.get('id_number2', form.id_number2),
                        form.gender2 = data.get('gender2', form.gender2),
                        form.date_of_birth2 = data.get('date_of_birth2', form.date_of_birth2),
                        form.phone_number2 = data.get('phone_number2', form.phone_number2),
                        form.firstname2 = data.get('firstname2', form.firstname2)
                        form.lastname2 = data.get('lastname2', form.lastname2)
                        form.email2 = data.get('email2', form.email2)

                        db.session.commit()
                        return jsonify(form.to_dict())

                    except IntegrityError:
                        db.session.rollback()
                        return jsonify({'error': 'Kindly correctly fill the form'}), 400

                    except Exception as e:
                        db.session.rollback()
                        return jsonify({'error': str(e)}), 500

                elif request.method == 'DELETE':
                    db.session.delete(form)
                    db.session.commit()
                    return jsonify({'message': 'Form deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
