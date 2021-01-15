from django.views import View
from django.http import JsonResponse,QueryDict
from django.views.decorators.csrf import csrf_exempt

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