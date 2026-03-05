from django.urls import path
from .views import AttendanceMarkView, AttendanceListView, AttendanceSummaryView, AttendanceByDateView

urlpatterns = [
    path('mark/', AttendanceMarkView.as_view(), name='attendance-mark'),
    path('by-date/', AttendanceByDateView.as_view(), name='attendance-by-date'),
    path('employee/<str:employee_id>/', AttendanceListView.as_view(), name='attendance-list'),
    path('summary/', AttendanceSummaryView.as_view(), name='attendance-summary'),
]
