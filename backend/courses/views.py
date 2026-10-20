from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse
from .models import Course, Instructor
from .serializers import CourseSerializer, InstructorSerializer
from .xml_handler import generate_courses_xml

class InstructorViewSet(viewsets.ModelViewSet):
    queryset = Instructor.objects.all().order_by('name')
    serializer_class = InstructorSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.select_related('instructor').all().order_by('-id')
    serializer_class = CourseSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'code', 'category', 'instructor__name']

    @action(detail=False, methods=['get'])
    def export_xml(self, request):
        courses = self.get_queryset()
        xml_data = generate_courses_xml(courses)
        response = HttpResponse(xml_data, content_type='application/xml')
        response['Content-Disposition'] = 'attachment; filename="courses_catalog.xml"'
        return response

    @action(detail=False, methods=['post'])
    def validate_xml(self, request):
        raw_xml = request.data.get('xml_content', '')
        if not raw_xml:
            return Response({"error": "No XML content provided."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            import xml.etree.ElementTree as ET
            root = ET.fromstring(raw_xml)
            total_courses = len(root.findall('Course'))
            return Response({
                "status": "valid",
                "message": f"XML parsed and validated successfully. Found {total_courses} course entries.",
                "total_courses": total_courses
            })
        except Exception as e:
            return Response({
                "status": "invalid",
                "error": f"XML validation failed: {str(e)}"
            }, status=status.HTTP_400_BAD_REQUEST)
