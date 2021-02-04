from flask import Flask, request, redirect
from flask_restful import Api,Resource,reqparse
from flask_cors import CORS
from flask import jsonify, render_template, request
from translate import Translator
from imp import reload
import os
import sys
sys.path.append("..") 
from FinTechAlgs import Bonds_NSModel,Bonds_NSSModel

BASE_DIR = os.path.dirname(__file__)

# Initialize Flask
app = Flask(__name__,static_folder='static',template_folder='static',static_url_path="")
api = Api(app)

# Cross Domain
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# parse parameters
parser = reqparse.RequestParser()
parser.add_argument('key', type=str)
parser.add_argument('input', type=str)
parser.add_argument('parameters', type=str)
parser.add_argument('dataSet', type=str)
parser.add_argument('row', type=str)

# Basic Route
# @app.route('/', methods=['GET', 'POST'])
# def index():
#     if request.method == 'GET':
#         return render_template('index.html')
#     elif request.method == 'POST':
#         key = request.args.get('key', '')
#         return render_template('index.html', data=key)

# RESTful API Route
# class jsonAPI(Resource):
#     def get(self,key):
#         try:
#             jsonObj = {"key":key}
#             return jsonify(jsonObj)
#         except Exception:
#             return jsonify({"error":"error"})
    
#     def post(self,key):
#         try:
#             args = parser.parse_args()
#             key = eval(args['key'])
#             jsonObj = {"key":key}
#             return jsonify(jsonObj)
#         except Exception:
#             return jsonify({"error":"error"})
# api.add_resource(jsonAPI, '/api/<key>')

class NSApi(Resource):
    def get(self):
        try:
            dataSet = request.args.get("dataset","")
            id = request.args.get("row","")
            if id != "-1":
                tau0, beta0, beta1, beta2, x, y_real, y, rs = Bonds_NSModel.runOne(int(id),f"{BASE_DIR}/FinTechAlgs/DataSource/{dataSet}.xlsx")
                jsonObj = {"t0":tau0,"b0":beta0,"b1":beta1,"b2":beta2,'x':list(x),'y':list(y),'y_real':list(y_real),"rsquare":rs}
            else:
                tempBest,paras,x,y,y_real = Bonds_NSModel.runData(f"{BASE_DIR}/FinTechAlgs/DataSource/{dataSet}.xlsx","production")
                jsonObj = {"rsquare":tempBest,"paras":paras,"x":list(x),"y":list(y),"y_real":list(y_real)}
            return jsonify(jsonObj)
        except Exception:
            return jsonify({"error":"error"})

    def post(self):
        try:
            args = parser.parse_args()
            params = eval(args['parameters'])
            dataSet = eval(args['dataSet'])
            row = int(args['row'])
            tempBest,paras,x,y,y_real = Bonds_NSModel.postOne(f"{BASE_DIR}/FinTechAlgs/DataSource/{dataSet}.xlsx",params,row)
            jsonObj = {"rsquare":tempBest,"paras":paras,"x":list(x),"y":list(y),"y_real":list(y_real)}
            return jsonify(jsonObj)
        except Exception:
            return jsonify({"error":"error"})
api.add_resource(NSApi, '/api/NS/')

class NSSApi(Resource):
    def get(self):
        try:
            dataSet = request.args.get("dataset","")
            id = request.args.get("row","")
            if id != "-1":
                tau0, tau1, beta0, beta1, beta2, beta3, x, y_real, y, rs = Bonds_NSSModel.runOne(int(id),f"{BASE_DIR}/FinTechAlgs/DataSource/{dataSet}.xlsx")
                jsonObj = {"t0":tau0,"t1":tau1,"b0":beta0,"b1":beta1,"b2":beta2,'b3':beta3,'x':list(x),'y':list(y),'y_real':list(y_real),"rsquare":rs}
            else:
                jsonObj = {"error":"error"}
            return jsonify(jsonObj)
        except Exception:
            return jsonify({"error":"error"})

    def post(self):
        try:
            args = parser.parse_args()
            params = eval(args['parameters'])
            dataSet = eval(args['dataSet'])
            row = int(args['row'])
            tempBest,paras,x,y,y_real = Bonds_NSSModel.postOne(f"{BASE_DIR}/FinTechAlgs/DataSource/{dataSet}.xlsx",params,row)
            jsonObj = {"rsquare":tempBest,"paras":paras,"x":list(x),"y":list(y),"y_real":list(y_real)}
            return jsonify(jsonObj)
        except Exception:
            return jsonify({"error":"error"})
api.add_resource(NSSApi, '/api/NSS/')

class CodeApi(Resource):
    def get(self):
        try:
            pkg = request.args.get("pkg","")
            if pkg=="code1":
                f1 = open(f"{BASE_DIR}/FinTechAlgs/CTA.py")
                f2 = open(f"{BASE_DIR}/FinTechAlgs/CTA_Garch.py")
                f3 = open(f"{BASE_DIR}/FinTechAlgs/CTA_KalmanFilter.py")
                rst = f1.readlines()+f2.readlines()+f3.readlines()
            elif pkg=="code2":
                f1 = open(f"{BASE_DIR}/FinTechAlgs/Options_BlackScholes.py")
                f2 = open(f"{BASE_DIR}/FinTechAlgs/Options_OptionPricing.py")
                rst = f1.readlines()+f2.readlines()
            elif pkg=="code3":
                f1 = open(f"{BASE_DIR}/FinTechAlgs/Equity_FamaFrench.py")
                rst = f1.readlines()
            return jsonify({"result":rst})
        except Exception:
            return jsonify({"error":"error"})
api.add_resource(CodeApi, '/api/codes/')

if __name__ == '__main__':
    app.run(debug=False)