from django.views import View
from django.http import JsonResponse,QueryDict
from django.views.decorators.csrf import csrf_exempt
from pathlib import Path
import sys 
sys.path.append("..") 
from FinTechAlgs import Bonds_NSModel,Bonds_NSSModel

BASE_DIR = Path(__file__).resolve().parent.parent

class RestApi(View):
    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        if request.method.lower() in self.http_method_names:
            handler = getattr(self, request.method.lower(), self.http_method_not_allowed)
        else:
            handler = self.http_method_not_allowed
        return handler(request, *args, **kwargs)
    def get(self,request):
        try:
            pkg = request.GET.get("pkg","")
            return JsonResponse({"result":pkg})
        except Exception:
            return JsonResponse({"error":"error"})

    def post(self,request):
        try:
            jsonDict = eval(request.body)
            pkg = jsonDict['pkg']
            return JsonResponse({"result":pkg})
        except Exception:
            return JsonResponse({"error":"error"})

    def put(self,request):
        values = QueryDict(request.body)
        return JsonResponse({"status":200,"data":"这是PUT请求"})
    def delete(self,request):
        values = QueryDict(request.body)
        return JsonResponse({"status":200,"data":"这是DELETE请求"})

class NSApi(View):
    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        if request.method.lower() in self.http_method_names:
            handler = getattr(self, request.method.lower(), self.http_method_not_allowed)
        else:
            handler = self.http_method_not_allowed
        return handler(request, *args, **kwargs)
    def get(self,request):
        try:
            dataSet = request.GET.get("dataset","")
            id = request.GET.get("row","")
            if id != "-1":
                tau0, beta0, beta1, beta2, x, y_real, y, rs = Bonds_NSModel.runOne(int(id),f"{BASE_DIR}/FinTechAlgs/DataSource/{dataSet}.xlsx")
                jsonObj = {"t0":tau0,"b0":beta0,"b1":beta1,"b2":beta2,'x':list(x),'y':list(y),'y_real':list(y_real),"rsquare":rs}
            else:
                tempBest,paras,x,y,y_real = Bonds_NSModel.runData(f"{BASE_DIR}/data/{dataSet}.xlsx","production")
                jsonObj = {"rsquare":tempBest,"paras":paras,"x":list(x),"y":list(y),"y_real":list(y_real)}
            return JsonResponse(jsonObj)
        except Exception:
            return JsonResponse({"error":"error"})

    def post(self,request):
        try:
            jsonDict = eval(request.body)
            params = eval(jsonDict['parameters'])
            dataSet = eval(jsonDict['dataSet'])
            row = int(jsonDict['row'])
            tempBest,paras,x,y,y_real = Bonds_NSModel.postOne(f"{BASE_DIR}/FinTechAlgs/DataSource/{dataSet}.xlsx",params,row)
            jsonObj = {"rsquare":tempBest,"paras":paras,"x":list(x),"y":list(y),"y_real":list(y_real)}
            return JsonResponse(jsonObj)
        except Exception:
            return JsonResponse({"error":"error"})

class NSSApi(View):
    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        if request.method.lower() in self.http_method_names:
            handler = getattr(self, request.method.lower(), self.http_method_not_allowed)
        else:
            handler = self.http_method_not_allowed
        return handler(request, *args, **kwargs)
    def get(self,request):
        try:
            dataSet = request.GET.get("dataset","")
            id = request.GET.get("row","")
            if id != "-1":
                tau0, tau1, beta0, beta1, beta2, beta3, x, y_real, y, rs = Bonds_NSSModel.runOne(int(id),f"{BASE_DIR}/FinTechAlgs/DataSource/{dataSet}.xlsx")
                jsonObj = {"t0":tau0,"t1":tau1,"b0":beta0,"b1":beta1,"b2":beta2,'b3':beta3,'x':list(x),'y':list(y),'y_real':list(y_real),"rsquare":rs}
            else:
                jsonObj = {"error":"error"}
            return JsonResponse(jsonObj)
        except Exception:
            return JsonResponse({"error":"error"})

    def post(self,request):
        try:
            jsonDict = eval(request.body)
            params = eval(jsonDict['parameters'])
            dataSet = eval(jsonDict['dataSet'])
            row = int(jsonDict['row'])
            tempBest,paras,x,y,y_real = Bonds_NSSModel.postOne(f"{BASE_DIR}/FinTechAlgs/DataSource/{dataSet}.xlsx",params,row)
            jsonObj = {"rsquare":tempBest,"paras":paras,"x":list(x),"y":list(y),"y_real":list(y_real)}
            return JsonResponse(jsonObj)
        except Exception:
            return JsonResponse({"error":"error"})

class CodeApi(View):
    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        if request.method.lower() in self.http_method_names:
            handler = getattr(self, request.method.lower(), self.http_method_not_allowed)
        else:
            handler = self.http_method_not_allowed
        return handler(request, *args, **kwargs)
    def get(self,request):
        # try:
        pkg = request.GET.get("pkg","")
        if pkg=="code1":
            f1 = open("FinTechAlgs/CTA.py")
            f2 = open("FinTechAlgs/CTA_Garch.py")
            f3 = open("FinTechAlgs/CTA_KalmanFilter.py")
            rst = f1.readlines()+f2.readlines()+f3.readlines()
        elif pkg=="code2":
            f1 = open("FinTechAlgs/Options_BlackScholes.py")
            f2 = open("FinTechAlgs/Options_OptionPricing.py")
            rst = f1.readlines()+f2.readlines()
        elif pkg=="code3":
            f1 = open("FinTechAlgs/Equity_FamaFrench.py")
            rst = f1.readlines()
        return JsonResponse({"result":rst})
        # except Exception:
        #     return JsonResponse({"error":"error"})