from django.urls import path
from .views import AttendanceMarkView, AttendanceListView, AttendanceSummaryView

urlpatterns = [
    path('mark/', AttendanceMarkView.as_view(), name='attendance-mark'),
    path('employee/<str:employee_id>/', AttendanceListView.as_view(), name='attendance-list'),
    path('summary/', AttendanceSummaryView.as_view(), name='attendance-summary'),
]
