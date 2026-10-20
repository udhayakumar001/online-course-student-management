import xml.etree.ElementTree as ET
from xml.dom import minidom
from django.conf import settings
import os

def generate_courses_xml(courses):
    root = ET.Element("CourseCatalog")
    for c in courses:
        course_el = ET.SubElement(root, "Course")
        ET.SubElement(course_el, "ID").text = str(c.id)
        ET.SubElement(course_el, "Code").text = c.code
        ET.SubElement(course_el, "Title").text = c.title
        ET.SubElement(course_el, "Category").text = c.category
        ET.SubElement(course_el, "Price").text = str(c.price)
        ET.SubElement(course_el, "DurationHours").text = str(c.duration_hours)
        ET.SubElement(course_el, "Instructor").text = c.instructor.name if c.instructor else "N/A"
        ET.SubElement(course_el, "Capacity").text = str(c.capacity)
        ET.SubElement(course_el, "Description").text = c.description

    raw_xml = ET.tostring(root, encoding="utf-8")
    parsed = minidom.parseString(raw_xml)
    return parsed.toprettyxml(indent="  ")
